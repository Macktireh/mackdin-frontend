import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Buttons/buttonSubmit";
import { authPath } from "../../routes/auth.route";

const ResetPasswordConfirm: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container-auth">
      <div className="modal-auth">
        <div className="success">
          <img src="/static/svg/success.svg" className="icon-success" alt="" />
          <br />
          <br />
          <h2>Réinitialisation du mot de passe terminée !</h2>
          <br />
          <p>
            Votre mot de passe a été bien défini. Vous pouvez continuer et vous connecter
            maintenant.
          </p>
          <br />
          <Button
            nameClass={"btn-signin btn-success"}
            text={"Se connecter"}
            handleClick={() => navigate(authPath.login)}
          />
        </div>
        <Link to="/">
          <div className="close">
            <img src="/static/svg/close.svg" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
