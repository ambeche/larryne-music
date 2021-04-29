import { React, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import { useQuery } from '@apollo/client';
import { PRODUCTS } from './requests/queries';
import Photos from './components/photos/Photos';
import Store from './components/store/Store';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import AdminPanel from './components/users/AdminPanel';
import Notification from './components/Notification';

const App = () => {
  const result = useQuery(PRODUCTS);
  const [user, setUser] = useState(null);
  const [notice, setNotice] = useState({ message: null, severity: null });
  console.log('notice', notice);
  const notify = (message) => {
    setNotice(message);
    setTimeout(() => {
      setNotice(null);
    }, 8000);
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  console.log(result.data.products);
  const padding = { padding: 10 };
  return (
    <Container>
      <div>
        <Link style={padding} to="/">
          LarryneMusic
        </Link>
        <Link style={padding} to="/photos">
          Photos
        </Link>
        <Link style={padding} to="/store">
          Store
        </Link>

        {
          // only appears if user is admin

          user?.role === user?.roleValue && (
            <Link style={padding} to="/admin">
              {user?.fullname}
            </Link>
          )
        }
        {user && !user?.roleValue && (
          <Link style={padding} to="/profile">
            {user.fullname}
          </Link>
        )}
        {
          // hidden upon successfull login
          !user && (
            <Link style={padding} to="/login">
              Login
            </Link>
          )
        }
      </div>

      <Switch>
        <Route path="/photos">
          <Photos />
        </Route>
        <Route path="/store">
          <Store />
        </Route>
        <Route path="/admin">
          <AdminPanel user={user} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} setError={notify} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Notification notice={notice} />
      <div>
        <br />
        <em>LarryneMusic</em>
      </div>
    </Container>
  );
};

export default App;
//{result.data.products.map(p => <img alt='' src={p.image.url} width='400'/>)}
