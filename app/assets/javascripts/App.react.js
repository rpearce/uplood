var React = require('react');
var request = require('superagent');

var App = React.createClass({
  getInitialState: function() {
    return {
      users: []
    }
  },

  componentWillMount: function() {
    this._fetchUsers();
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this._handleFormSubmit}>
          <div>
            <label htmlFor="user_name">Name</label><br />
            <input ref="userName" type="text" name="user[name]" id="user_name" />
          </div>
          <div>
            <label htmlFor="user_avatar">Avatar</label><br />
            <input ref="userAvatar" type="file" name="user[avatar]" id="user_avatar" />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <ul className="users">{this._buildUsers()}</ul>
      </div>
    );
  },

  _buildUsers: function() {
    return this.state.users.map(function(user) {
      return (
        <li key={'user' + user.id} className="user">
          <div className="user__avatar">
            <img src={user.avatar.url} alt="Avatar" title="Avatar" />
          </div>
          <div className="user__name">{user.name}</div>
        </li>
      );
    });
  },

  _fetchUsers: function() {
    request
      .get('/users')
      .set('Accept', 'application/json')
      .end(this._handleFetch);
  },

  _handleFetch: function(err, res) {
    if (err) { console.log(err) };
    this.setState({ users: res.body });
  },

  _handleFormSubmit: function(e) {
    e.preventDefault();
    var fd = new FormData(e.target);
    console.log(fd);
    request
      .post('/users')
      .set('Accept', 'application/json')
      .send(fd)
      .set('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content)
      .end(this._handlePost);
  },

  _handlePost: function(err, res) {
    if (err) { console.log(err) };
    this._fetchUsers();
  }
});

module.exports = App;
