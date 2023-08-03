export abstract class ROUTES {

    static readonly URL = 'http://localhost:8090';
    static readonly PREFIX = `${this.URL}/api/collections/`;

    static readonly USERS = {
        // AUTH
        LOGIN: `${ROUTES.PREFIX}users/auth-with-password`,
        REFRESH: `${ROUTES.PREFIX}users/auth-refresh`,
    }

    static readonly TASKS = {
        LIST: `${ROUTES.PREFIX}task_lists/records`,
        TASK: `${ROUTES.PREFIX}task_tasks/records`,
    }

    static readonly HABITS = {
        HABIT: `${ROUTES.PREFIX}habit_names/records`,
        TRACK: `${ROUTES.PREFIX}habit_tracks/records`,
    }
    
}