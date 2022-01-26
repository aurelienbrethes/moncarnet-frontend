import React from 'react';

import UserInfos from '../../../Interfaces//IuserInfos';
import AppointmentInfos from '../../../Interfaces/IAppointmentInfos';
import ProsInfos from '../../../Interfaces/IPros';

interface AppointmentProps {
  appointment: AppointmentInfos;
  user: UserInfos;
  pros: ProsInfos;
  setUserId: Function;
  setProsId: Function;
  setShowUser: Function;
  setShowPros: Function;
}

function AppointmentCard({
  appointment,
  user,
  pros,
  setUserId,
  setProsId,
  setShowUser,
  setShowPros,
}: AppointmentProps) {
  return (
    <div className="grid grid-cols-5 pt-2 pb-2 hover:bg-background/20">
      <p>{appointment.id_appointment}</p>
      <p>{new Date(appointment.date).toLocaleDateString()}</p>
      <button
        onClick={() => {
          setUserId(user.id_user);
          setShowUser(true);
        }}
        className="underline hover:text-background">
        {user.lastname.toUpperCase() +
          ' ' +
          user.firstname.charAt(0).toUpperCase() +
          user.firstname.slice(1)}
      </button>
      <button
        onClick={() => {
          setProsId(pros.id_pros);
          setShowPros(true);
        }}
        className="underline hover:text-background">
        {pros.name}
      </button>
      <p>{appointment.comment}</p>
    </div>
  );
}

export default AppointmentCard;
