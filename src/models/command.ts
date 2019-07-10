export interface CommandContent {
  apiUrl: string;
  successMessage: string;
}

export interface Command {
  userSaid: string;
  content: CommandContent;
  type: string;
}
