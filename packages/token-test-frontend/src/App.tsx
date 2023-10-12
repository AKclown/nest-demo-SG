import { useCallback, useState } from "react";
import { token, userLogin } from "./interface";

interface User {
  username: string;
  email?: string;
}

function App() {
  const [user, setUser] = useState<User>();

  const login = useCallback(async () => {
    const res = await userLogin('AKclown', '123456');
    const { userInfo, accessToken, refreshToken } = res.data;

    setUser(userInfo);

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }, []);

  const getToken = useCallback(async () => {
    const res = await token();

    console.log(res);
  }, []);

  return (
    <div className="App">
      <div>
        {
          user?.username
            ? `当前登录用户： ${user?.username}`
            : <button onClick={login}>登录</button>
        }
      </div>
      <div>
        <button onClick={getToken}>获取token</button>
      </div>
    </div>
  );
}

export default App;