import React from 'react';

import FamilyMemberSummary from './FamilyMemberSummary';

const FamilyMemberList = ({familyMembers}) => {
  console.log('fam mes', familyMembers)
  return (
    <div className="family-member-list list-group">
      {
        familyMembers && familyMembers.map(familyMember => {
          return (
            <FamilyMemberSummary familyMember={familyMember} key={familyMember.id} />
          )
        })
      }
    </div>
  )

}

export default FamilyMemberList;
