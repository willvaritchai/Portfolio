import { Route } from '@angular/router';
import { ChatsComponent } from './event-chat/event-chats.component';
import { ChatsListComponent } from './chat-list.component';
import { GetRequestResolver, GetRoomChatResolver } from './chats.resolve';
import { ReviewComponent } from './review/review.component';
import { DoneComponent } from './done/done.component';
import { AppLoadingResolver, CheckCookieResolver } from 'src/app/app.resolve';
// import { GetAllUserTestResolver } from './chats.resolve';

export const ChatsRoutes: Route[] = [
    {
        path     : '',
        children : [
            {
                path      : '',
                component : ChatsListComponent,
                resolve   : {
                    appLoadingResolver: AppLoadingResolver,
                    // getRequestResolver : GetRequestResolver,
                },
            },
            {
                path      : 'event/:id',
                component : ChatsComponent,
                resolve   : {
                    checkCookieResolver: CheckCookieResolver,
                    getRoomChatResolver:GetRoomChatResolver
                },
            },
            {
                path      : 'review/:id',
                component : ReviewComponent,
                resolve   : {
                    appLoadingResolver: AppLoadingResolver,
                },
            },
            {
                path      : 'review/done/:id',
                component : DoneComponent,
                resolve   : {
                    checkCookieResolver: CheckCookieResolver
                },
            }
        ],
    },
];
