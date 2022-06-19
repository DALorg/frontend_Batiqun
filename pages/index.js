import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardBody } from "reactstrap";
import { getDashboard } from "../redux/actions/dashboardAction";
import Layout from "./components/Layout";
import Navsidebar from "./components/Navsidebar";
import {Bar, Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import BarChart from "chartjs";

const index = (props) => {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.Dashboards);
  const {loading, error, dashboard }= allData;
  console.log(dashboard);

  const ProductData = dashboard.TotalProduct;
  const UserData = dashboard.TotalUser;
  const SalesData = dashboard.TotalSales;
  const ChartData = dashboard.UserChart;
  const SalesChartData = dashboard.SalesChart;


  //Load Data
  useEffect(() => {
    dispatch(getDashboard());
  },[]);

      return (
        <div>
          <Head>
            <title>Dashboard</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <body className="g-sidenav-show bg-gray-100">
          <div className="min-height-300 bg-primary position-absolute w-100"></div>
            <Navsidebar></Navsidebar>

            <main className="main-content position-relative border-radius-lg">
              <div className="container-fluid py-1">
                <div className="row">
                <div className="col-12">

                <div className="col-lg-6 col-7">
                    <h6 className="h2 text-white d-inline-block m-4">Dashboard</h6>
                </div>

            <div className="row mb--4" style= {{ justifyContent:"space-around"}} >
            <div className="col-xl-3 col-md-6">
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Total Product</h5>
                      <span className="h2 font-weight-bold mb-0">{ProductData?.TotalData}</span>
                    </div>
                    <div className="col-auto">
                        <i className="material-icons">local_mall</i>
                    </div>
                    <p className="mt-3 mb-0 text-sm">

                    {ProductData?.Growth < 0 ? <> 
                    <span className="text-warning mr-2"> 
                    <i className="fas fa-arrow-down text-warning mr-3" />&nbsp;{ProductData?.Growth} &nbsp;
                    <i className="fas fa-percent text-warning mr-3" />
                    </span> </>
                     : <> 

                    <span className="text-success mr-2"> 
                     <i className="fa fa-arrow-up"></i>&nbsp;{ProductData?.Growth} &nbsp;
                     <i className="fas fa-percent mr-3" />
                    </span> </> } 
                     
                     <span className="text-nowrap">&nbsp;Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">New users</h5>
                      <span className="h2 font-weight-bold mb-0">{UserData?.TotalData}</span>
                    </div>
                    <div className="col-auto">
                        <i className="material-icons">assignment_ind</i>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm">

                    {UserData?.Growth < 0 ? <> 
                    <span className="text-warning mr-2"> 
                    <i className="fas fa-arrow-down text-warning mr-3" />&nbsp;{UserData?.Growth} &nbsp;
                     <i className="fas fa-percent text-warning mr-3" />
                    </span> </>
                     : <> 
                    <span className="text-success mr-2"> 
                     <i className="fa fa-arrow-up"></i>&nbsp;{UserData?.Growth}
                     </span> </> } 

                    <span className="text-nowrap">&nbsp;Since last month</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Sales</h5>
                      <span className="h2 font-weight-bold mb-0">{SalesData?.TotalData}</span>
                    </div>
                    <div className="col-auto">
                        <i className="material-icons">local_grocery_store</i>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm">

                    {SalesData?.Growth < 0 ? <> 
                    <span className="text-warning mr-2"> 
                    <i className="fas fa-arrow-down text-warning mr-3" />&nbsp;{SalesData?.Growth} 
                    </span> </>
                     : <> 
                    <span className="text-success mr-2"> 
                     <i className="fa fa-arrow-up"></i>&nbsp;{SalesData?.Growth}
                     </span> </> } 

                    <span className="text-nowrap">&nbsp;Since last month</span>
                  </p>
                </div>
              </div>
            </div>
            </div>

    <div className="container-fluid mt--6">
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header bg-transparent">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 className="h3 mb-0">Sales value</h5>
                </div>
              </div>
            </div>
            <CardBody>
            <div className="card-body">
              <div className="chart">
                <Bar
                  data={{
                    labels : SalesChartData?.map((data) => data.Month),
                    datasets : [
                     {
                       label: "Sales Value",
                       data: SalesChartData?.map((data) => data.TotalData),
                       backgroundColor: ["#9b6b43", "#c2a58d"], 
                    
                     },
                   ],
                   }}
                />
              </div>
            </div>
            </CardBody>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header bg-transparent">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                  <h5 className="h3 mb-0">Total orders</h5>
                </div>
              </div>
            </div>
            <CardBody>
            <div className="card-body">
              <div className="chart">
                <Bar
                  data={{
                    labels : ChartData?.map((data) => data.Month),
                    datasets : [
                     {
                       label: "Total Order",
                       data: ChartData?.map((data) => data.TotalData),
                       backgroundColor: ["#c2a58d", "#9b6b43"], 
                     },
                   ],
                   }}

                />
              </div>
            </div>
            </CardBody>
          </div>
        </div>
      </div>
      </div>
          </div>
          </div>
          </div>
          </main>
          </body>
        </div>
      );
}

export default index;