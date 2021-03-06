import React, { useEffect, useState } from 'react';

import { brands } from '../../../API/request';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';

function VehiculesSelectOptions({ vehicule }: { vehicule: IVehiculeAndUser }) {
  const [brand, setBrand] = useState<string>('');

  async function getBrand() {
    const res = await brands.getOne(vehicule.brandId);
    if (res) setBrand(res.name);
  }

  useEffect(() => {
    getBrand();
  }, [vehicule]);

  return (
    <option className="text-black" key={vehicule.immat} value={vehicule.immat}>
      {brand && `${brand} ${vehicule.model} | ${vehicule.immat}`}
    </option>
  );
}

export default VehiculesSelectOptions;
