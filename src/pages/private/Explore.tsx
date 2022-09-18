import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, IStateReduce } from "@/models";

type Props = { currentUser: IAuthUserProfile | null };

const Explore: React.FC<Props> = () => {
  return (
    <>
      <main className="main">
        <div className="main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.explore.name} title="Latest Tweets" />
          </section>
          <div>Explore</div>
        </div>
      </main>
      <Aside page={privateRoutes.explore.name} />
    </>
  );
};

const ExploreConnectWithStore: React.FC<Props> = ({ currentUser }) => {
  return (
    <Layout>
      <Explore currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(ExploreConnectWithStore);
