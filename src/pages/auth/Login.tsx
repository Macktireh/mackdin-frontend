import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";
import useLogin from "../../hooks/auth/useLogin";
import { ILogin, TauthState } from "../../interfaces";
import loginAction from "../../actions/auth/login.action";
import { authPath } from "../../routes/auth.route";

const Login: React.FC<any> = ({ loginAction, isAuthenticated }) => {
  const [formData, setFormData] = React.useState<ILogin>({
    email: "",
    password: "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const navigate = useNavigate();
  const customHooksLogin = useLogin;

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customHooksLogin(email, password, setDisplayError, setDisabled, setDetailError, loginAction);
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError && (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>{detailError}</span>
            </div>
          )}
          <Input id="email" name="email" type="email" label="Email" onChange={handleChange} />
          <Input
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            onChange={handleChange}
          />
          <Button nameClass={"btn-signup"} text={"Se connecter"} isDisabled={disabled} />
          <div className="info">
            <h4>
              Mot de passe ?{" "}
              <span onClick={() => navigate(disabled ? "" : authPath.requestResetPassword)}>
                Cliquer ici
              </span>
            </h4>
            <h4>
              Vous n'avez pas de compte ?{" "}
              <span onClick={() => navigate(disabled ? "" : authPath.signup)}>Inscrivez-vous</span>
              <br />
              <br />
            </h4>
          </div>
        </form>

        <div className="close" onClick={() => navigate(disabled ? "" : "/")}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: TauthState) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, { loginAction })(Login);
