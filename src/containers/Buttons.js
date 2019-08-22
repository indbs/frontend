import React, { Component }                       from 'react';
import                                                 '../bootstrap.min.css';

export class RegisterRememberButtons extends Component {
  render(){
    return(
      <div className="form-group">
        <button_reg type="submit" onClick={() => {this.props.history.push("/registration");}} className="btn btn-outline-secondary btn-sm btn-block ml-1 mt-3">
          Регистрация
        </button_reg>
        <button_rem type="submit" className="btn btn-outline-secondary btn-sm btn-block ml-1 mt-1">
          Восстановить пароль
        </button_rem>
      </div>
    )
  }
}

export class SubmitButton extends Component {
  render(){
    return(
      <div className="form-group">
        <button type="submit" className={(JSON.stringify(this.props.errors)=='{}')?"btn btn-primary":"btn btn-danger"} disabled={this.props.isSubmitting}>
          Войти
        </button>
        {this.props.isSubmitting &&
          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
      </div>
    )
  }
}

export class RegisterButton extends Component {
  render(){
    return(
      <div className="form-group">
        <button type="submit" onClick={() => {this.props.history.push("/registration");}} className={(JSON.stringify(this.props.errors)=='{}')?"btn btn-primary ml-1 mt-3":"btn btn-danger ml-1 mt-3"}>
          Зарегистрироваться
        </button>
      </div>
    )
  }
}