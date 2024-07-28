import type React from 'react';
import type { UserSignInType, UserSignUpType, UserUpdateImageType } from '../../types/userTypes';
import { useAppDispatch } from './reduxHooks';
import { signInThunk, signUpThunk, updateUserThunk } from '../../redux/auth/authActionThunk';

export default function useAuth(): {
  signInHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  signUpHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  updateUserHandler: (obj: UserUpdateImageType) => void
} {
  const dispatch = useAppDispatch();

  const signInHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as UserSignInType;
    if (!data.email || !data.password) return;
    void dispatch(signInThunk(data));
  };

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;
    if (!data.email || !data.password || !data.name) return;
    void dispatch(signUpThunk(data));
  };

  const updateUserHandler = (obj: UserUpdateImageType): void => {
    void dispatch(updateUserThunk(obj));
  };

  return {
    signInHandler,
    signUpHandler,
    updateUserHandler,
  };
  
}
