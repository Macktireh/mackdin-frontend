import React from "react";

import UserCard from "@/components/navbar/UserCard";
import IconSVG from "@/widgets/IconSVG";
import { IUserProfile } from "@/models";
import { useDispatch } from "react-redux";
import logoutAction from "@/actions/auth/logout.action";

type PropsType = React.PropsWithChildren<{
  currentUser?: IUserProfile | null;
  handleClose?: () => void;
  dispatch?: any;
}>;

const PopupLogout: React.FC<PropsType> = ({ currentUser, handleClose, dispatch }) => {
  const handleLogout = () => {
    dispatch && dispatch(logoutAction(currentUser?.user.public_id as string));
  };
  return (
    <div className="PopupLogout">
      <div className="content">
        <div className="user-card">
          <UserCard currentUser={currentUser}>
            <IconSVG iconName="ok" fill="#1d9bf0" />
          </UserCard>
        </div>
        <div className="add-account">
          <p>Ajouter un compte existant</p>
        </div>
        <div className="logout-btn" onClick={handleLogout}>
          <p>Log out @{currentUser?.pseudo}</p>
        </div>
      </div>
    </div>
  );
};

const PopupLogoutConnectWithStore: React.FC<PropsType> = ({ currentUser }) => {
  const dispatch = useDispatch();
  return <PopupLogout currentUser={currentUser} dispatch={dispatch as any} />;
};

export default PopupLogoutConnectWithStore;
