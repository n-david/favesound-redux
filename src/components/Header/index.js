import PropTypes from 'prop-types';
import React from 'react';
import map from '../../services/map';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/index';
import { GENRES, DEFAULT_GENRE } from '../../constants/genre';
import { browse, dashboard } from '../../constants/pathnames';

function getGenreLink(genre) {
  return `${browse}/${genre || DEFAULT_GENRE}`;
}

const Logo = () => (
  <div>
    <div className="logo">
      <Link to="/">
        <h1>Favesound</h1>
      </Link>
    </div>
    <div className="github-link">
      <Link to="https://github.com/rwieruch/favesound-redux/" target="_blank">
        <p>Fork Me on Github</p>
      </Link>
    </div>
  </div>
);

const MenuItem = ({ genre, selectedGenre }) => {
  const linkClass = classNames('menu-item', {
    'menu-item-selected': genre === selectedGenre,
  });

  return (
    <Link to={getGenreLink(genre)} className={linkClass}>
      {genre}
    </Link>
  );
};

const Login = ({ onLogin }) => (
  <Link onClick={onLogin} to={dashboard}>
    Login
  </Link>
);

const Logout = ({ onLogout }) => (
  <Link onClick={onLogout} to={browse}>
    Logout
  </Link>
);

const Dashboard = ({ onDashboard }) => (
  <Link onClick={onDashboard} to={dashboard}>
    Dashboard
  </Link>
);

const SessionAction = ({ currentUser, onLogin, onLogout, onDashboard }) => (
  <div>
    <div className="dashboard-link">
      {currentUser ? <Dashboard onDashboard={onDashboard} /> : ' '}
    </div>
    <div className="session-link">
      {currentUser ? (
        <Logout onLogout={onLogout} />
      ) : (
        <Login onLogin={onLogin} />
      )}
    </div>
  </div>
);

const MenuList = ({ selectedGenre }) => {
  if (!selectedGenre) return null;
  return (
    <div>
      {map((genre, key) => {
        const menuItemProps = { genre, selectedGenre, key };
        return <MenuItem {...menuItemProps} />;
      }, GENRES)}
    </div>
  );
};

const Header = ({
  currentUser,
  selectedGenre,
  onLogin,
  onLogout,
  onDashboard,
}) => (
  <div className="header">
    <div className="header-content">
      <Logo />
      <MenuList selectedGenre={selectedGenre} />
      <SessionAction
        currentUser={currentUser}
        onLogin={onLogin}
        onLogout={onLogout}
        onDashboard={onDashboard}
      />
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    currentUser: state.session.user,
    selectedGenre: state.browse.selectedGenre,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: bindActionCreators(actions.login, dispatch),
    onLogout: bindActionCreators(actions.logout, dispatch),
  };
}

Header.propTypes = {
  currentUser: PropTypes.object,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
