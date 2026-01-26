import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'eali_db',
    password: 'alfatiha',
    port: 5432,
});

const newsData = [
    {
        id: 3,
        title_en: 'Admissions Open for 2024 Academic Year',
        title_fr: 'Les admissions sont ouvertes pour l\'année académique 2024',
        category: 'Admissions'
    }
];

const partnersData = [
    { name_en: 'Kabale University', name_fr: 'Université de Kabale', country_en: 'Uganda', country_fr: 'Ouganda', type: 'international' },
    { name_en: 'Centre International de Recherche pour le Développement Durable (CIRDD)', name_fr: 'Centre International de Recherche pour le Développement Durable (CIRDD)', country_en: 'International', country_fr: 'International', type: 'international' },
    { name_en: 'Pareto University', name_fr: 'Université Pareto', country_en: 'United Kingdom', country_fr: 'Royaume-Uni', type: 'international' },
    { name_en: 'Université Evangelique en Afrique (UEA)', name_fr: 'Université Evangelique en Afrique (UEA)', country_en: 'RDC', country_fr: 'RDC', type: 'international' },
    { name_en: 'Institut Supérieur de Développement Rural (ISDR)', name_fr: 'Institut Supérieur de Développement Rural (ISDR)', country_en: 'RDC', country_fr: 'RDC', type: 'international' },
    { name_en: 'Université du Burundi', name_fr: 'Université du Burundi', country_en: 'Burundi', country_fr: 'Burundi', type: 'national' },
    { name_en: 'Université de Ngozi', name_fr: 'Université de Ngozi', country_en: 'Burundi', country_fr: 'Burundi', type: 'national' },
    { name_en: 'Universités privées au Burundi', name_fr: 'Universités privées au Burundi', country_en: 'Burundi', country_fr: 'Burundi', type: 'national' },
    { name_en: 'Gouvernement du Burundi', name_fr: 'Gouvernement du Burundi', country_en: 'Burundi', country_fr: 'Burundi', type: 'national' },
    { name_en: 'Institut des Sciences Agronomiques du Burundi (ISABU)', name_fr: 'Institut des Sciences Agronomiques du Burundi (ISABU)', country_en: 'Burundi', country_fr: 'Burundi', type: 'national' },
    { name_en: 'US Embassy du Burundi', name_fr: 'Ambassade des Etats-Unis au Burundi', country_en: 'Burundi', country_fr: 'Burundi', type: 'national' },
    { name_en: 'Higher Life Foundation', name_fr: 'Higher Life Foundation', country_en: 'Burundi', country_fr: 'Burundi', type: 'national' }
];

const programsData = [
    { name_en: 'Communication Sciences', name_fr: 'Sciences de la Communication', type: 'faculty', icon: 'Globe', options_en: ['Communication for Development'], options_fr: ['Communication pour le Développement'] },
    { name_en: 'Economics and Management Sciences', name_fr: 'Sciences Economiques et de Gestion', type: 'faculty', icon: 'Briefcase', options_en: ['Management and Accounting', 'Community Development'], options_fr: ['Gestion et Comptabilité', 'Développement Communautaire'] },
    { name_en: 'Health Sciences', name_fr: 'Sciences de la Santé', type: 'faculty', icon: 'BookOpen', options_en: ['Public Health', 'Human Nutrition'], options_fr: ['Santé Publique', 'Nutrition Hummaine'] },
    { name_en: 'Sciences and Technologies', name_fr: 'Sciences et Technologies', type: 'faculty', icon: 'Cpu', options_en: ['Computer Network Management', 'IT Maintenance', 'Business Computing'], options_fr: ['Gestion des Réseaux Informatiques', 'Maintenance Informatique', 'Informatique de Gestion'] },
    { name_en: 'Agronomic Sciences', name_fr: 'Sciences Agronomiques', type: 'faculty', icon: 'Sprout', options_en: ['Plant Production', 'Animal Production', 'Food Security'], options_fr: ['Production Végétale', 'Production Animale', 'Sécurité Alimentaire'] },
    { name_en: 'Management and Accounting', name_fr: 'Gestion et Comptabilité', type: 'professional_course', icon: 'Briefcase' },
    { name_en: 'Community Development', name_fr: 'Développement Communautaire', type: 'professional_course', icon: 'Globe' },
    { name_en: 'Telecommunication and Networks', name_fr: 'Télécommunication et Réseaux', type: 'professional_course', icon: 'Wifi' },
    { name_en: 'IT Maintenance', name_fr: 'Maintenance Informatique', type: 'professional_course', icon: 'Cpu' },
    { name_en: 'Hospitality and Tourism', name_fr: 'Hôtelerie et Tourisme', type: 'professional_course', icon: 'Briefcase' },
    { name_en: 'Agriculture and Development', name_fr: 'Agriculture et Développement', type: 'professional_course', icon: 'Sprout' },
    { name_en: 'Livestock and Development', name_fr: 'Elevage et développement', type: 'professional_course', icon: 'Sprout' }
];

async function seed() {
    try {
        await client.connect();
        console.log('Connected to database');

        // 1. Update News
        for (const item of newsData) {
            await client.query(
                'UPDATE "api_newsevent" SET "title_en" = $1, "title_fr" = $2, "category" = $3 WHERE "id" = $4',
                [item.title_en, item.title_fr, item.category, item.id]
            );
            console.log(`Updated News ID ${item.id}`);
        }

        // 2. Update Partners
        for (let i = 0; i < partnersData.length; i++) {
            const partner = partnersData[i];
            const id = i + 1;
            await client.query(
                'UPDATE "api_partner" SET "name_en" = $1, "name_fr" = $2, "country_en" = $3, "country_fr" = $4, "type" = $5 WHERE "id" = $6',
                [partner.name_en, partner.name_fr, partner.country_en, partner.country_fr, partner.type, id]
            );
            console.log(`Updated Partner ID ${id}`);
        }

        // 3. Insert Programs
        // Clear existing programs first to avoid duplicates if re-run
        await client.query('DELETE FROM "programs"');
        for (const program of programsData) {
            await client.query(
                'INSERT INTO "programs" ("name_en", "name_fr", "type", "icon", "options_en", "options_fr") VALUES ($1, $2, $3, $4, $5, $6)',
                [program.name_en, program.name_fr, program.type, program.icon, program.options_en ? program.options_en.join(',') : null, program.options_fr ? program.options_fr.join(',') : null]
            );
            console.log(`Inserted Program: ${program.name_en}`);
        }

        console.log('Seeding completed successfully');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        await client.end();
    }
}

seed();
