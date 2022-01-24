import axios from 'axios';

import AppointmentInfos from '../Interfaces/IAppointmentInfos';
import BrandInfos from '../Interfaces/IBrandInfos';
import ModelInfos from '../Interfaces/IModelInfos';
import ProsInfos from '../Interfaces/IPros';
import ServiceBookInfos from '../Interfaces/IServiceBook';
import TypeInfos from '../Interfaces/ITypeInfos';
import UserInfos from '../Interfaces/IuserInfos';
import VehiculeInfos from '../Interfaces/IVehiculeInfos';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const admin = {
  getOne: (idAdmin: number) =>
    axios
      .get(`${API_URL}/admin/${idAdmin}`, { withCredentials: true })
      .then((res) => res.data),
};

export const appointment = {
  getAll: () =>
    axios
      .get(`${API_URL}/appointment`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (appointmentId: number): Promise<AppointmentInfos> =>
    axios
      .get(`${API_URL}/appointment/${appointmentId}`, { withCredentials: true })
      .then((res) => res.data),
};

export const users = {
  getAll: () =>
    axios.get(`${API_URL}/users/all`, { withCredentials: true }).then((res) => res.data),
  getOne: (idUser: number): Promise<UserInfos> =>
    axios
      .get(`${API_URL}/users/${idUser}`, { withCredentials: true })
      .then((res) => res.data),
  getUserWithoutAppointment: () =>
    axios
      .get(`${API_URL}/users/withoutAppointment`, { withCredentials: true })
      .then((res) => res.data),
};

export const pros = {
  getAll: () =>
    axios.get(`${API_URL}/pros`, { withCredentials: true }).then((res) => res.data),
  getOne: (prosId: number): Promise<ProsInfos> =>
    axios
      .get(`${API_URL}/pros/${prosId}`, { withCredentials: true })
      .then((res) => res.data),
};

export const vehicule = {
  getAll: () =>
    axios
      .get(`${API_URL}/vehicules/all`, { withCredentials: true })
      .then((res) => res.data),
  getVehiculeNoValidate: () =>
    axios
      .get(`${API_URL}/vehicules/all?noValidate=true`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (immat: string): Promise<VehiculeInfos> =>
    axios
      .get(`${API_URL}/vehicules/${immat}`, { withCredentials: true })
      .then((res) => res.data),
  putOne: (immat: string, data: VehiculeInfos): Promise<VehiculeInfos> =>
    axios
      .put(
        `${API_URL}/vehicules/${immat}`,

        data,

        { withCredentials: true },
      )
      .then((res) => res.data),
  getVehiculeWithoutServiceBook: () =>
    axios
      .get(`${API_URL}/vehicules/withoutServiceBook`, { withCredentials: true })
      .then((res) => res.data),
};

export const brands = {
  getOne: (idBrand: number): Promise<BrandInfos> =>
    axios
      .get(`${API_URL}/brands/${idBrand}`, { withCredentials: true })
      .then((res) => res.data),
};

export const model = {
  getOne: (idModel: number): Promise<ModelInfos> =>
    axios
      .get(`${API_URL}/models/${idModel}`, { withCredentials: true })
      .then((res) => res.data),
};

export const type = {
  getOne: (idType: number): Promise<TypeInfos> =>
    axios
      .get(`${API_URL}/types/${idType}`, { withCredentials: true })
      .then((res) => res.data),
};

export const service_book = {
  getAll: () =>
    axios
      .get(`${API_URL}/service_book`, { withCredentials: true })
      .then((res) => res.data),
  getServiceBookVehicule: (immat: string): Promise<ServiceBookInfos[]> =>
    axios
      .get(`${API_URL}/service_book/vehicule/${immat}`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (idServiceBook: number): Promise<ServiceBookInfos> =>
    axios
      .get(`${API_URL}/service_book/${idServiceBook}`, { withCredentials: true })
      .then((res) => res.data),
};

export const login = {
  admin: (admin: { email: string; password: string }) =>
    axios
      .post(`${API_URL}/auth/admin/login`, admin, { withCredentials: true })
      .then((res) => res.status),
};

export const isLoggin = {
  get: () =>
    axios.get(`${API_URL}/auth/login`, { withCredentials: true }).then((res) => res.data),
};
