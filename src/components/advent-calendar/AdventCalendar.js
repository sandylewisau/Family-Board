import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const AdventCalendar = ({events}) => {
  console.log('fam mes', events)
  return (
    <div className="container">
        {
          events && events.map(event => {
            return (
              <div className="row pb-2" key={event.id}>
                <Link to={'./edit/'+ event.id}>{moment(event.openDate.toDate()).format('LLL')}</Link>
              </div>
            )
          })
        }
      </div>
  )

}

export default AdventCalendar;

