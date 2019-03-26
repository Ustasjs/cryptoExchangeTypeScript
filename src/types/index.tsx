import { IAuthState } from '../reducers/auth';
import { ICurrencyState } from '../reducers/currency';
import { NetworkState } from '../reducers/network';
import { IUserState } from '../reducers/user';

export interface IResponceData {
  mts: number;
  sell: number;
  purchase: number;
  high: number;
  low: number;
}

export interface IAuthResponse {
  data: {
    jwt: string;
  };
}

export interface IResponce {
  data: {
    result: IResponceData[];
  };
}
export interface IStore {
  auth: IAuthState;
  currency: ICurrencyState;
  networkError: NetworkState;
  user: IUserState;
}

interface ICurrencyData {
  high: number;
  low: number;
  mts: number;
  purchase: number;
  sell: number;
}
export interface ILoadingState {
  error?: string | boolean;
  isLoading: boolean;
  isLoaded: boolean;
}

export type exchange = [Date, number];
export interface ICurrency {
  currentPurchasePrice: number;
  currentSellPrice: number;
  data: ICurrencyData[];
  max: string;
  min: string;
  purchase: exchange[];
  sell: exchange[];
}
export interface ICredentials {
  email: string;
  password: string;
}

export interface IParaticlesParams {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: 'polygon';
      stroke: {
        width: number;
        color: string;
      };
      polygon: {
        nb_sides: number;
      };
      image: {
        src: string;
        width: number;
        height: number;
      };
    };
    opacity: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        opacity_min: number;
        sync: boolean;
      };
    };
    size: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        size_min: number;
        sync: boolean;
      };
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
      shadow: {
        enable: boolean;
        blur: number;
        color: string;
      };
    };
    move: {
      enable: boolean;
      speed: number;
      direction: 'none';
      random: boolean;
      straight: boolean;
      out_mode: 'out';
      bounce: boolean;
      attract: {
        enable: boolean;
        rotateX: number;
        rotateY: number;
      };
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: 'grab';
      };
      onclick: {
        enable: boolean;
        mode: 'grab';
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      bubble: {
        distance: number;
        size: number;
        duration: number;
        opacity: number;
        speed: number;
      };
      repulse: {
        distance: number;
        duration: number;
      };
      push: {
        particles_nb: number;
      };
      remove: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
  fps_limit: number;
}
