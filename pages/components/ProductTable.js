import React from "react";
// reactstrap components
import { Button, Table } from "reactstrap";

function Example() {
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th className=" text-center">#</th>
              <th>Name</th>
              <th>Job Position</th>
              <th>Since</th>
              <th className=" text-right">Salary</th>
              <th className=" text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" text-center">1</td>
              <td>Andrew Mike</td>
              <td>Develop</td>
              <td>2013</td>
              <td className=" text-right">€ 99,225</td>
              <td className=" td-actions text-right">
                <Button
                  className=" btn-icon"
                  color="info"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-circle-08 pt-1"></i>
                </Button>
  
                <Button
                  className=" btn-icon"
                  color="success"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-settings-gear-65 pt-1"></i>
                </Button>
  
                <Button
                  className=" btn-icon"
                  color="danger"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-fat-remove pt-1"></i>
                </Button>
              </td>
            </tr>
            <tr>
              <td className=" text-center">2</td>
              <td>John Doe</td>
              <td>Design</td>
              <td>2012</td>
              <td className=" text-right">€ 89,241</td>
              <td className=" td-actions text-right">
                <Button
                  className=" btn-icon"
                  color="info"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-circle-08 pt-1"></i>
                </Button>
  
                <Button
                  className=" btn-icon"
                  color="success"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-settings-gear-65 pt-1"></i>
                </Button>
  
                <Button
                  className=" btn-icon"
                  color="danger"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-fat-remove pt-1"></i>
                </Button>
              </td>
            </tr>
            <tr>
              <td className=" text-center">3</td>
              <td>Alex Mike</td>
              <td>Design</td>
              <td>2010</td>
              <td className=" text-right">€ 92,144</td>
              <td className=" td-actions text-right">
                <Button
                  className=" btn-icon btn-simple"
                  color="info"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-circle-08 pt-1"></i>
                </Button>
  
                <Button
                  className=" btn-icon btn-simple"
                  color="success"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-settings-gear-65 pt-1"></i>
                </Button>
  
                <Button
                  className=" btn-icon btn-simple"
                  color="danger"
                  size="sm"
                  type="button"
                >
                  <i className=" ni ni-fat-remove pt-1"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
  
  export default Example;