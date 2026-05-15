'use client';

import { useStore } from '@/lib/store';
import { I } from './icons';

export function Toast() {
  const { toast } = useStore();
  return (
    <div className={'toast' + (toast.show ? ' show' : '')}>
      <I.Check size={14} className="ic" />
      {toast.msg}
    </div>
  );
}
