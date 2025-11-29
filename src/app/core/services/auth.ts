import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUserEmail';

  constructor(private localStorage: LocalStorage) {}

  private hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = (hash * 31 + password.charCodeAt(i)) | 0;
    }
    return hash.toString();
  }

  getUsers(): User[] {
    const users = this.localStorage.getItem<User[]>(this.USERS_KEY);
    return users || [];
  }

  userExists(email: string): boolean {
    const users = this.getUsers();
    return users.some(user => user.email === email);
  }

  register(user: User): boolean {
    if (this.userExists(user.email)) {
      return false;
    }
    const hashedUser: User = {
      ...user,
      password: this.hashPassword(user.password),
    };
    const users = this.getUsers();
    users.push(hashedUser);
    this.localStorage.setItem(this.USERS_KEY, users);
    return true;
  }

  login(email: string, password: string): boolean {
    const hashed = this.hashPassword(password);
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === hashed);
    if (!user) {
      return false;
    }
    this.localStorage.setItem(this.CURRENT_USER_KEY, email);
    return true;
  }

  getCurrentUserEmail(): string | null {
    return this.localStorage.getItem<string>(this.CURRENT_USER_KEY);
  }

  isLoggedIn(): boolean {
    const email = this.getCurrentUserEmail();
    return email !== null && email !== '';
  }

  logout(): void {
    this.localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}
