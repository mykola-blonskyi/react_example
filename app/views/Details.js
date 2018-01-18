import React from 'react';

import DetailsHeader from '../components/DetailsHeader';
import DetailsSideBar from '../components/DetailsSideBar';
import DetailsContent from '../components/DetailsContent';

const DetailsView = ({}) => (
  <div>
    <DetailsHeader />

    <section className="project_view_wrapper">
      <div className="clearfix">
        <DetailsSideBar />
        <DetailsContent />
      </div>
    </section>
  </div>
);

export default DetailsView;
