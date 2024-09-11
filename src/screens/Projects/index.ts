import dynamic from 'next/dynamic';

export default dynamic(() => import(/* webpackChunkName: "projects" */ './Projects'));
