import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mb-5">
              <div className="card-body">
                <h5 className="card-title">Family</h5>
                <p className="card-text">View the family settings</p>
                <Link to='/family/create-family' className="btn btn-info">View</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-5">
              <div className="card-body">
                <h5 className="card-title">Family Members</h5>
                <p className="card-text">See who's part of the family</p>
                <Link to='/family/create-family' className="btn btn-info">View</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card mb-5">
              <div className="card-body">
                <h5 className="card-title">Advent Dashboard</h5>
                <p className="card-text">Dashboardy</p>
                <Link to='/advent/dashboard' className="btn btn-info">View</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-5">
              <div className="card-body">
                <h5 className="card-title">Family Members</h5>
                <p className="card-text">See who's part of the family</p>
                <Link to='/family/create-family' className="btn btn-info">View</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
