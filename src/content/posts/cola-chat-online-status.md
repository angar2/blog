---
title: 실시간 사용자 온라인 상태 관리
description: 채팅방 최대 정원 제한을 위해 Map 자료구조로 사용자 온라인 상태를 관리하고, 서버와 클라이언트 간 웹소켓 이벤트로 실시간 동기화하는 과정을 정리한다.
track: log
created: 2024-10-02T09:42
tags: [websocket, socketio, nestjs]
---

이전 문서에서 WebSocket 연결 및 해제, 실시간 메세지 전송과 수신 기능을 구현했다. 이 기능들만으로도 채팅에는 문제가 없지만, 아쉬운 점이 있다.

채팅방의 최대 정원을 제한해야 하는데 현재 상태로는 제한 없이 누구나 입장할 수 있기 때문에, 사용자의 온라인 상태를 관리하는 로직이 필요하다.

이 기능을 구현하고 프로젝트의 버전 1.0을 마무리하고자 한다.

## 아이디어: 온라인 상태 그룹

채팅방마다 사용자 온라인 상태를 관리하는 아이디어는 다음과 같다.

- 서버에 Map 자료구조를 활용해 온라인 상태 그룹을 생성한다.
- 사용자가 채팅방에 입장하면 해당 그룹에 추가한다.
- 그룹 내의 사용자 수가 채팅방의 최대 정원을 초과하면 입장하지 못하도록 제한한다.
- 사용자가 채팅방에서 퇴장하면 그룹에서 제거한다.
- 그룹에 속한 특정 사용자의 상태가 변경되면 채팅방의 모든 사용자에게 알린다.

### 구조

온라인 상태 그룹의 구조는 다음과 같다.

![온라인 상태 그룹의 Room-Chatter-Socket 구조 다이어그램](/assets/images/blog/42/1.png)

서버에서 사용되는 실제 Map 데이터(`onlineClient`)는 각 요소의 식별자(`id`)만을 포함하고 있다.

- Room → `roomId`
- Chatter → `chatterId`
- Socket → `socketId`

> [!note]
> 1사용자-n소켓 구조: 현재 버전에서는 1사용자-1소켓을 원칙으로 삼고 있지만, 추후 회원제를 도입할 경우 한 회원이 여러 개의 소켓을 운용할 수 있어야 하기 때문에 미리 구조화해두었다.

온라인 상태 그룹은 현재 서버의 Service 클래스의 속성으로 관리하고 있다.

서버의 부담이 커지거나 서버 재시작 시 온라인 상태 데이터가 유실될 우려가 있지만, 개발 단계에서의 테스트와 성능 최적화를 고려하여 우선적으로 메모리에서 직접 관리하는 방식을 택했다.

추후 서비스가 외부로 제공되거나 확장성이 필요해지면 별도의 DB를 마련하여 관리할 예정이다.

## 기능 구현: 사용자 온라인 상태 관리

서버와 클라이언트의 웹 프레임워크는 다음과 같다.

- 서버: Nest.js
- 클라이언트: Next.js

> [!note]
> 이 문서에서 작업하는 버전은 각각 `@nestjs/core@10.0.0`, `next@14.2.6`이다.

### 서버

서버에서는 Map 자료구조와 Service 로직으로 온라인 상태를 관리한다.

- **Map 자료 구조**

  ```ts
  // src/app/chat/chat.service.ts
  private onlineClients = new Map<string, Map<string, Set<string>>>();
  ```

  Service 클래스의 속성으로 `roomId`-`chatterId`-`socketId` 형식의 온라인 상태 그룹이 생성된다.

- **Service 로직**

  - **온라인 상태 처리 메서드**

    ```ts
    // src/app/chat/chat.service.ts

    ...

    @Injectable()
    export class ChatService {

      private onlineClients = new Map<string, Map<string, Set<string>>>();

      ...

      // 채팅방 온라인 상태 전송
      private async emitOnlineClients(
        socket: Socket,
        roomId: string,
      ): Promise<void> {
        const namespace: Namespace = socket.nsp;

        // onlineClients 조회
        const chatterIds = this.getOnlineClients(roomId);
        const chatters = await this.prisma.chatter.findMany({
          where: { id: { in: chatterIds } },
        });

        // 웹소켓 전송
        this.emit<Chatter[]>(namespace, roomId, SocketEvent.CHATTERS, chatters);
      }

      // 온라인에 소켓 추가
      private addSocketToOnline(
        roomId: string,
        chatterId: string,
        socketId: string,
      ): void {
        if (!this.onlineClients.has(roomId))
          this.onlineClients.set(roomId, new Map());

        const room = this.onlineClients.get(roomId);
        if (!room.has(chatterId)) room.set(chatterId, new Set());

        const sockets = room!.get(chatterId);
        sockets.add(socketId);
      }

      // 온라인에서 소켓 제거
      private removeSocketFromOnline(
        roomId: string,
        chatterId: string,
        socketId: string,
      ): void {
        const room = this.onlineClients.get(roomId);
        if (room && room.has(chatterId)) {
          const sockets = room.get(chatterId);
          if (sockets) sockets.delete(socketId);
        }
      }

      // 온라인에 채터 제거
      private removeChatterFromOnline(roomId: string, chatterId: string): void {
        const room = this.onlineClients.get(roomId);
        if (room && room.has(chatterId)) {
          const sockets = room.get(chatterId);
          if (sockets.size === 0) room.delete(chatterId);
          if (room.size === 0) this.onlineClients.delete(roomId);
        }
      }

      // 채팅방 온라인 상태 조회
      private getOnlineClients(roomId: string): string[] {
        const room = this.onlineClients.get(roomId);
        return room ? Array.from(room.keys()) : [];
      }
    }
    ```

    각 메서드는 필요에 따라 호출되어 온라인 상태를 관리하는 역할로 사용된다.

    여기서 `emitOnlineClients` 메서드는 채팅방의 현재 온라인 상태를 실시간으로 전송하는 이벤트 트리거 역할을 한다. 이때 온라인 상태로서, 현재 연결된 모든 채팅 사용자의 데이터(`typeof Chatter`)를 배열로 전달한다.

  - **온라인 상태 처리 메서드 사용 예시**

    ```ts
    // src/app/chat/chat.service.ts

    ...

    @Injectable()
    export class ChatService {

      ...

      // 채팅방 입장 처리
      async handleJoinRoom(
        data: { roomId: string; chatterId: string | null },
        socket: Socket,
      ): Promise<Chatter> {
        const { roomId, chatterId } = data;
        const namespace: Namespace = socket.nsp;

        // 다른 입장 처리 로직
        ...

        // 채팅방 온라인 상태에 소켓 추가
        this.addSocketToOnline(roomId, chatterId, socket);

        // 채팅방 온라인 상태 전송
        await this.emitOnlineClients(socket, roomId);

        // 다른 입장 처리 로직
        ...
      }


      // 채팅방 퇴장 처리
      async handleLeaveRoom(socket: Socket): Promise<void> {
        const namespace: Namespace = socket.nsp;
        const socketChatters = socket.data.chatters;
        const roomId = socketChatters ? Object.keys(socketChatters)[0] : null;
        const chatterId: string = roomId ? socketChatters[roomId] : null;
        if (!roomId || !chatterId) throw NotFoundException;

        // 다른 퇴장 처리 로직
        ...

        // 채팅방 온라인 상태에서 소켓 제거
        this.removeSocketFromOnline(roomId, chatterId, socket);

        const timeout = setTimeout(async () => {

          // 채팅방 온라인 상태에서 채터 제거
          this.removeChatterFromOnline(roomId, chatterId);

          // 채팅방에 온라인 상태 전송
          await this.emitOnlineClients(socket, roomId);

        }, LEAVE_MESSAGE_DELAY_TIME);

        // 다른 퇴장 처리 로직
        ...
      }
    }
    ```

    ```ts
    // src/app/chat/chat.gateway.ts

    ...

    @WebSocketGateway({ namespace: /\/*.+/ })
    export class ChatGateway {

      ...

      // 온라인 상태 전송 처리
      @SubscribeMessage('returnChatters')
      async handleSendOnlineClients(
        @MessageBody() data: { roomId: string },
        @ConnectedSocket() socket: Socket,
      ): Promise<void> {
        await this.chatService.handleSendOnlineClients(data, socket);
      }
    }
    ```

    사용자가 채팅방에 입장하거나 퇴장할 때, 서버는 온라인 상태를 적절히 변경하고, 변경된 상태를 클라이언트로 전송한다.

    또한, 웹소켓이 아닌 일반 API 요청 후에도 온라인 상태 업데이트가 필요할 수 있기 때문에, 게이트웨이에 온라인 상태를 전송하는 이벤트 리스너를 별도로 추가해두었다.

### 클라이언트

클라이언트에서는 웹소켓 이벤트 리스너와 트리거를 통해 온라인 상태를 동기화한다.

- **웹소켓 온라인 상태 이벤트 리스너**

  ```ts
  // src/app/hooks/useSocket.ts

  ...

    export default function useSocket(props: Props) {

    ...

    const { socket, setSocket } = useSocketStore();

    const setChatters = useRoomStore((state) => state.setChatters);

    useEffect(() => {
      if (!namespace) return;

      const socketInstance = io(`${SOCKET_BASE_URL}/${namespace}`, {
        transports: ['websocket'],
        autoConnect: false,
      });

      // 소켓 연결 로직
      ...

      // 온라인 상태 이벤트 리스너
      socketInstance.on(SocketEvent.CHATTERS, (data) => {
        // 온라인 상태 데이터 상태 관리에 추가
        setChatters(data);
      });

      return () => {
        // 소켓 연결 해제 로직
        ...

      };
    }, [namespace, roomId]);
  }
  ```

  온라인 상태는 현재 채팅방에 입장해 있는 사용자 목록을 의미한다.

  이벤트 리스너를 등록하여 서버로부터 채팅 사용자 데이터 배열을 전달받고, 이를 `setChatters` 스토어 메서드를 통해 상태 관리에 반영한다.

  이 상태는 '온라인 사용자 보기' 등 몇몇 컴포넌트에서 사용된다.

- **웹소켓 온라인 상태 이벤트 트리거**

  ```ts
  // src/shared/webSockets/emit.ts

  interface WSResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }

  ...

  // 온라인 채터 상태 요청
  export function emitChatters(
    socket: Socket,
    data: { roomId: string },
    callback?: () => void
  ) {
    socket.emit(SocketEvent.CHATTERS, data, (response: WSResponse<null>) => {
      if (response.success) callback && callback();
    });
  }
  ```

  필요한 경우, 설정된 웹소켓 이벤트를 통해 서버로 온라인 상태를 직접 요청할 수 있다.

  예시로, 닉네임 변경 API 요청 후에 성공 여부에 따라 `emitChatters` 함수를 호출해 온라인 상태를 업데이트한다.
