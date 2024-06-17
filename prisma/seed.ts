import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const badges = [
    {
      slug: 'cda',
      name: 'Cidade Alta',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    },
    {
      slug: 'cda-valley',
      name: 'Cidade Alta Valley',
      imageUrl:
        'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    },
    {
      slug: 'policia',
      name: 'Policia do Cidade Alta',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    },
    {
      slug: 'hospital',
      name: 'Hospital do Cidade Alta',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
    },
    {
      slug: 'mecanica',
      name: 'Mecânica do Cidade Alta',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    },
    {
      slug: 'taxi',
      name: 'Taxi do Cidade Alta',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
    },
    {
      slug: 'curuja',
      name: 'Coruja',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
    },
    {
      slug: 'hiena',
      name: 'Hiena',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
    },
    {
      slug: 'gato',
      name: 'Gato',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/gato.png',
    },
    {
      slug: 'urso',
      name: 'Urso',
      imageUrl: 'https://cidadealtarp.com/imagens/challenge/urso.png',
    },
  ];

  for (const badge of badges) {
    const createdBadges = await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {},
      create: badge,
    });
    console.log(`Created slug: ${createdBadges.slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
