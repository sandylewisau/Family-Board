import React from 'react';
import moment from 'moment';

const FamilyMemberSummary = ({familyMember}) => {
  return (
    <div className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{familyMember.firstName} {familyMember.lastName}</h5>
        <small>{moment(familyMember.createdAt.toDate()).fromNow()}</small>
      </div>
      {/* <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> */}
      <small>Created by {familyMember.createdByFirstName} {familyMember.createdByLastName}.</small>
    </div>
  )

}

export default FamilyMemberSummary;
