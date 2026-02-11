import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LessonCategory {
    id: bigint;
    title: string;
    description: string;
}
export interface Lesson {
    id: bigint;
    categoryId: bigint;
    title: string;
    content: string;
    difficulty: string;
    tags: Array<string>;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface HelpRequest {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllHelpRequests(): Promise<Array<HelpRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDisclaimer(): Promise<string>;
    getLesson(lessonId: bigint): Promise<Lesson>;
    getLessonCategories(): Promise<Array<LessonCategory>>;
    getLessonsByCategory(categoryId: bigint): Promise<Array<Lesson>>;
    getSupportContactInfo(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchLessons(term: string): Promise<Array<Lesson>>;
    submitHelpRequest(name: string, email: string, message: string): Promise<bigint>;
}
