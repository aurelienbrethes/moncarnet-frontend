import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { pros } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import { h1 } from '../../../variableTailwind';
import { button, h2 } from '../../../variableTailwind';
import InfosLine from '../../Particulars/ParticularInfos/InfosLine';
import IPros from '../../../Interfaces/IUser';

const Profile = () => {

  const { prosLoggedIn } = useContext(ProsContext);

  const [infoUser, setInfoUser]= useState<IPros[]>([]);
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [addressUpdate, setAddressUpdate] = useState<string>('');
  const [postalUpdate, setPostalUpdate] = useState<string>('');
  const [cityUpdate, setCityUpdate] = useState<string>('');
  const [phoneUpdate, setPhoneUpdate] = useState<string>('');
  const [emailUpdate, setEmailUpdate] = useState<string>('');
  const [nameUpdate, setNameUpdate] = useState<string>('');
  const [siretUpdate, setSiretUpdate] = useState<string>('');


  async function getOne () {
    const res = await pros.getOne(prosLoggedIn.id_user)
    setInfoUser(res);
  }

  useEffect(() => {
    prosLoggedIn &&
    getOne();
  }, [prosLoggedIn]);

  const handleInfosUser = () => {
    getInfosPros();
    setChangeMode(!changeMode);
  };

  function refreshPage() {
    window.location.reload();
  }

  async function getInfosPros() {
    try {
      const res = await pros.put(prosLoggedIn.id_user, {
        name: nameUpdate || infoUser.name,
        email: emailUpdate || infoUser.email,
        address: addressUpdate || infoUser.address,
        postal_code: parseInt(postalUpdate) || parseInt(infoUser.postal_code),
        city: cityUpdate || infoUser.city,
        phone: phoneUpdate || infoUser.phone,
        siret: siretUpdate || infoUser.siret,
        id_user: 0
      });
      if (res.status === 200) toast.success('Vos informations ont bien été modifiées');

      refreshPage();
    } catch (err) {
      console.log(err);
      if (err)
        toast.error(
          "Une erreur s'est produite, vos informations n'ont pas été modifiées!",
        );
    }
  }

  return (
    <div className="w-full h-full">
      <h1 className={`${h1} m-6`}>Mon Profil</h1>
      {infoUser && (
        <main className="h-4/6">
          <h2 className={`${h2}`}>Nom du Garage</h2>
          <InfosLine
            champ={'name'}
            lineName={infoUser.name}
            changeMode={changeMode}
            setChangeMode={setChangeMode}
            modif={nameUpdate}
            setModif={setNameUpdate}
          />
          <h2 className={`${h2}`}>Numéro de Siret</h2>
          <InfosLine
            champ={'siret'}
            lineName={infoUser.siret}
            changeMode={changeMode}
            setChangeMode={setChangeMode}
            modif={siretUpdate}
            setModif={setSiretUpdate}
          />
          <div className="flex items-center justify-around w-full h-4/6">
            <div className="w-2/5 h-full">
              <h2 className={`${h2}`}>Adresse</h2>
              <InfosLine
                champ={'adresse'}
                lineName={infoUser.address}
                changeMode={changeMode}
                setChangeMode={setChangeMode}
                modif={addressUpdate}
                setModif={setAddressUpdate}
              />
              <InfosLine
                champ={'code postal'}
                lineName={infoUser.postal_code}
                changeMode={changeMode}
                setChangeMode={setChangeMode}
                modif={postalUpdate}
                setModif={setPostalUpdate}
              />
              <InfosLine
                champ={'Ville'}
                lineName={infoUser.city}
                changeMode={changeMode}
                setChangeMode={setChangeMode}
                modif={cityUpdate}
                setModif={setCityUpdate}
              />
            </div>
            <div className="w-2/5 h-full">
              <h2 className={`${h2}`}>Contact</h2>
              <InfosLine
                champ={'Téléphone'}
                lineName={infoUser.phone}
                changeMode={changeMode}
                setChangeMode={setChangeMode}
                modif={phoneUpdate}
                setModif={setPhoneUpdate}
              />
              <InfosLine
                champ={'email'}
                lineName={infoUser.email}
                changeMode={changeMode}
                setChangeMode={setChangeMode}
                modif={emailUpdate}
                setModif={setEmailUpdate}
              />
            </div>
          </div>
          <button
            className={`w-1/6 ${button}`}
            onClick={() =>
              !changeMode ? setChangeMode(!changeMode) : handleInfosUser()
            }>
            {changeMode ? 'Valider' : 'Modifier'}
          </button>
        </main>
      )}
    </div>
  );
};

export default Profile;
