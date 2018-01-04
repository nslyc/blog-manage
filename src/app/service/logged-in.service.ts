import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * @export 用户服务
 * @class LoggedInService
 */
@Injectable()
export class LoggedInService {

	// 是否处于登录状态
	private nowLoginStatus = new Subject<boolean>();
	status$ = this.nowLoginStatus.asObservable();
	announceLoggedIn(status: boolean) {
		this.nowLoginStatus.next(status);
    }
    
    // 用户过期
    userPast() {
        this.announceLoggedIn(false);
        localStorage.clear();
    }
}