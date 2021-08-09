interface ICreateUserDTO {
  discord_user_id: string;
  discord_username: string;
  discord_nickname?: string;
  is_rocketseat_team?: boolean;
}

export { ICreateUserDTO };
