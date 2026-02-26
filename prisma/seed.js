const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Brands...');
    const brandsData = [
        { name: 'Brembo', tagline: 'High Performance Brakes' },
        { name: 'Mobil 1', tagline: 'Advanced Synthetic Motor Oil' },
        { name: 'NGK', tagline: 'Ignition Specialists' },
        { name: 'K&N', tagline: 'High-Flow Air Filters' },
        { name: 'Philips', tagline: 'Automotive Lighting' },
        { name: 'Optima', tagline: 'Ultimate Power Batteries' },
        { name: 'Bosch', tagline: 'Invented for Life' },
        { name: 'Momo', tagline: 'Racing Steering Wheels' },
    ];

    const createdBrands = {};
    for (const b of brandsData) {
        try {
            const created = await prisma.brand.create({ data: b });
            createdBrands[b.name] = created.id;
            console.log(`  ✓ Brand: ${b.name}`);
        } catch (e) {
            // Already exists – fetch its ID
            const existing = await prisma.brand.findFirst({ where: { name: b.name } });
            if (existing) createdBrands[b.name] = existing.id;
            console.log(`  ⏭ Brand already exists: ${b.name}`);
        }
    }

    console.log('Seeding Categories...');
    const categoriesData = [
        { name: 'Engine Components', slug: 'engine', icon: 'Settings' },
        { name: 'Brake Systems', slug: 'brakes', icon: 'Disc' },
        { name: 'Electrical & Lighting', slug: 'electrical', icon: 'Zap' },
        { name: 'Suspension & Steering', slug: 'suspension', icon: 'Activity' },
        { name: 'Filters & Fluids', slug: 'filters', icon: 'ShieldAlert' },
        { name: 'Transmission', slug: 'transmission', icon: 'Cpu' },
    ];

    const createdCategories = {};
    for (const c of categoriesData) {
        try {
            const created = await prisma.category.create({ data: c });
            createdCategories[c.slug] = created.id;
            console.log(`  ✓ Category: ${c.name}`);
        } catch (e) {
            const existing = await prisma.category.findFirst({ where: { slug: c.slug } });
            if (existing) createdCategories[c.slug] = existing.id;
            console.log(`  ⏭ Category already exists: ${c.name}`);
        }
    }

    console.log('Seeding Products...');
    const productsData = [
        {
            name: 'High-Performance Brake Calipers (Set of 2)',
            brandId: createdBrands['Brembo'],
            categoryId: createdCategories['brakes'],
            price: 299.99,
            sku: 'BR-HC-500',
            stock: 45,
            images: [],
            description: 'Upgrade your stopping power with these high-performance brake calipers. Designed for ultimate precision and durability under extreme driving conditions.',
            features: ['6-piston aluminum design', 'High-temperature red powder coat finish', 'Includes premium ceramic brake pads', 'Direct bolt-on replacement', 'Fits 13-inch and larger rotors'],
        },
        {
            name: 'Synthetic Motor Oil 5W-30',
            brandId: createdBrands['Mobil 1'],
            categoryId: createdCategories['filters'],
            price: 34.50,
            sku: 'MO-5W30-1G',
            stock: 500,
            images: [],
            description: 'Advanced full synthetic motor oil designed to keep your engine running like new.',
            features: ['Excellent overall lubrication and wear protection', 'Outperforms conventional high mileage oils', 'Helps protect critical engine parts'],
        },
        {
            name: 'Premium Spark Plugs (Set of 4)',
            brandId: createdBrands['NGK'],
            categoryId: createdCategories['electrical'],
            price: 45.00,
            sku: 'NGK-IX-4',
            stock: 120,
            images: [],
            description: 'Iridium IX Spark Plugs designed specifically for the performance enthusiast.',
            features: ['Fine Iridium tip ensures high durability', 'Trivalent Metal Plating for superior anti-corrosion'],
        },
        {
            name: 'Cold Air Intake System',
            brandId: createdBrands['K&N'],
            categoryId: createdCategories['engine'],
            price: 189.99,
            sku: 'KN-CAI-200',
            stock: 30,
            images: [],
            description: 'Boost horsepower and acceleration with this high-flow cold air intake system.',
            features: ['Guaranteed to increase horsepower', 'Washable and reusable filter', 'Easy bolt-on installation'],
        },
        {
            name: 'LED Headlight Bulb Pair (H11)',
            brandId: createdBrands['Philips'],
            categoryId: createdCategories['electrical'],
            price: 79.99,
            sku: 'PH-LED-H11',
            stock: 200,
            images: [],
            description: 'Ultra-bright LED headlight bulbs providing 200% more light than standard halogen bulbs.',
            features: ['6000K cool white light', '50,000+ hour lifespan', 'Direct plug-and-play replacement'],
        },
        {
            name: 'High-Performance Car Battery',
            brandId: createdBrands['Optima'],
            categoryId: createdCategories['electrical'],
            price: 249.99,
            sku: 'OPT-RED-35',
            stock: 60,
            images: [],
            description: 'SpiralCell design provides a strong and clean power source, ensuring the safety of you, your family and the environment.',
            features: ['15x more vibration resistant', 'Spill-proof and maintenance-free', 'Faster recharging'],
        },
        {
            name: 'Performance Brake Pads (Front)',
            brandId: createdBrands['Bosch'],
            categoryId: createdCategories['brakes'],
            price: 65.00,
            sku: 'BO-QC-FRT',
            stock: 350,
            images: [],
            description: 'QuietCast premium disc brake pads are specifically designed and tested for quiet operation with minimal dust.',
            features: ['OE-fit design for easy installation', 'Multi-layer rubber shim for noise dampening', 'Includes hardware kit'],
        },
        {
            name: 'Steering Wheel - Racing Style',
            brandId: createdBrands['Momo'],
            categoryId: createdCategories['suspension'],
            price: 320.00,
            sku: 'MM-PRO-350',
            stock: 15,
            images: [],
            description: 'Genuine MOMO Prototipo steering wheel with a classic racing heritage and modern leather grip.',
            features: ['350mm diameter', 'Black leather with white stitching', 'Brushed aluminum spokes'],
        },
    ];

    for (const p of productsData) {
        try {
            await prisma.product.create({ data: p });
            console.log(`  ✓ Product: ${p.name}`);
        } catch (e) {
            console.log(`  ⏭ Product already exists: ${p.name}`);
        }
    }

    // Seed Admin accounts
    console.log('Seeding Admin accounts...');
    const adminsData = [
        { username: 'admin', password: 'admin1234', role: 'admin' },
        { username: 'rayen', password: 'm6e63v10', role: 'superadmin' },
    ];

    for (const a of adminsData) {
        try {
            const existing = await prisma.admin.findUnique({ where: { username: a.username } });
            if (existing) {
                console.log(`  ⏭ Admin already exists: ${a.username}`);
                continue;
            }
            const hashed = await bcrypt.hash(a.password, 12);
            await prisma.admin.create({
                data: { username: a.username, password: hashed, role: a.role },
            });
            console.log(`  ✓ Admin: ${a.username}`);
        } catch (e) {
            console.log(`  ⏭ Admin already exists: ${a.username}`);
        }
    }

    console.log('\n✅ Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
