
class UserLineItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  close() {
    this.setState({editing: false}, () => this.props.close())
  }

  render() {
    if(!this.state.editing) {
      if(this.props.user) {
        return <li>
          <Link to={`/users/${this.props.user.id}`}>{this.props.user.name} - {this.props.user.email}</Link> | <a href="#" onClick={(e) => { e.preventDefault; this.setState({editing: true})}}>[Edit]</a>
        </li>
      } else {
        return (
          <li><a href="#" onClick={(e) => { e.preventDefault; this.setState({editing: true})}}>[Add New User]</a></li>
        )
      }

    } else {
      return (
        <li><EditGenericType close={this.close.bind(this)} data={this.props.user} fields={["name", "email"]} type="user" typePlural="users"/></li>
      )
    }
  }
}