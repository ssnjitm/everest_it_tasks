import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type{  RegionData,  ServerTime } from '../types';

export const useMapData = () => {
  return useQuery<RegionData[]>({
    queryKey: ['map-data'],
    queryFn: async () => {
      const { data } = await api.get('/map-data');
      return data;
    },
    refetchInterval: 30000, // Refresh data every 30 seconds
  });
};

export const useServerTime = () => {
  return useQuery<ServerTime>({
    queryKey: ['server-time'],
    queryFn: async () => {
      const { data } = await api.get('/time');
      return data;
    },
    refetchInterval: 10000,
  });
};