import NextAuth from 'next-auth';
import authOptions from '@/lib/auth'; // if you have path alias '@' set in tsconfig.json or jsconfig.json
// or, if not using alias:
// import authOptions from '../../../../lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
