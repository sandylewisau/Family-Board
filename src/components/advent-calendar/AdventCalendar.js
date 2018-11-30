import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const AdventCalendar = ({events, isAdmin}) => {
  console.log('fam mes', events)
  return (
    <div className="container">
    <ul className="list-unstyled">
        {
          events && events.map(event => {
            return (
              <li className="media mb-5" key={event.id}>
              <Link to={'./date-detail/'+ event.id}><span className="pl-3 pr-3 mr-3 display-1" role="img" aria-labelledby="jsx-a11y/accessible-emoji">🎁</span></Link>
                <div className="media-body">
                  <h5 className="mt-0 mb-1 display-4">Day {moment(event.openDate.toDate()).format('D')}</h5>
                  <Link to={'./date-detail/'+ event.id} className="btn btn-info mr-3">Open</Link>
                  { isAdmin && <Link to={'./edit/'+ event.id} className="btn btn-warning">Edit</Link>}
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
  )

}

export default AdventCalendar;

