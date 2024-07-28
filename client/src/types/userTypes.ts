export type UserType = {
    user: WritableDraft<{ status: "fetching"; }> | WritableDraft<{ status: "guest"; }> | WritableDraft<{ status: "logged"; } & UserType>;
    id: number;
    name: string;
    email: string;
    image: string;
  };
  
  export type UserSignUpType = Omit<UserType, 'id'> & { password: string };
  export type UserSignInType = Omit<UserSignUpType, 'name'>;
  export type UserFromBackendType = { accessToken: string; user: UserType };
  
  export type UserStateType =
    | { status: 'fetching' }
    | { status: 'guest' }
    | ({ status: 'logged' } & UserType);
  
    export type UserUpdateImageType = {
      userId: number;
      newImage: string;
    };