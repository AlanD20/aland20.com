import { NextPage } from 'next';

const NoDataFound: NextPage = () => (
  <main className="page content-container">
    <h2 className="title">Server failed to deliver the content!</h2>
    <div className="text-block">
      <h3>
        Please inform <span className="marker lowercase">aland20@pm.me</span>
        address on the issue as soon as possible!
      </h3>
    </div>
  </main>
);

export default NoDataFound;
