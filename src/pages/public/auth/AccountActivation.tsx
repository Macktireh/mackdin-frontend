import * as React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import accountActivationAction from "@/actions/auth/accountActivation.action";
import { authRoutes } from "@/routes/auth.routes";

const AccountActivation: React.FC<any> = ({ accountActivationAction }) => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = authRoutes.accountActivation.title;
    (async () => {
      const res = await accountActivationAction(uidb64, token);
      if (!res.error) {
        navigate(authRoutes.accountActivationSuccess.path);
      } else {
        navigate("/not-found/");
      }
    })();
  });

  return <></>;
};

export default connect(null, { accountActivationAction })(AccountActivation);