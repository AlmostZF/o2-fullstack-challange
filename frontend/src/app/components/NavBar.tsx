
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path || pathname.startsWith(path + '/')
  
      ? 'px-4 py-2 rounded-t border border-blue-600 text-blue-600 bg-blue-50 font-medium'
      : 'px-4 py-2 rounded-t border border-gray-300 text-gray-800 bg-white hover:bg-gray-200 hover:text-black transition duration-200';

  return (
    <div className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-10 sm:gap-20 font-[family-name:var(--font-geist-sans)]">
      <p className='text-2xl font-bold text-center text-gray-800 mb-6'>Gestão de estoque</p>
      <nav className="flex space-x-4">
        <Link href="/" className={linkClass('/')}>Produtos</Link>

        {pathname.startsWith('/pages/edit') && (
          <Link href="/pages/edit" className={linkClass('/pages/edit')}>Editar</Link>
        )}
        
        <Link href="/pages/create" className={linkClass('/pages/create')}>Adicionar</Link>
        <Link href="/pages/relatorio" className={linkClass('/pages/relatorio')}>Relatório</Link>
      </nav>
    </div>
  );
};

export default NavBar;
