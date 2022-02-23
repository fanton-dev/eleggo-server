import { createContext, FC, useState } from 'react';

interface UserContextExports {
  sessionCookie: string | undefined;
}

export const UserContext = createContext<UserContextExports>({
  sessionCookie: undefined,
});

const UserProvider: FC<{}> = ({ children }) => {
  const [sessionCookie, setSessionCookie] = useState<string | undefined>(
    undefined,
  );

  return (
    <UserContext.Provider value={{ sessionCookie }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
