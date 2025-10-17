# SlayerForge Product Schema

## Product Content Type Fields:

### Basic Information
- **name** (Text) - Required, Unique
- **description** (Long Text) - Required
- **price** (Number, Decimal) - Required
- **category** (Enumeration) - swords, armor, accessories, techniques

### Weapon Specifications
- **weaponType** (Enumeration) - katana, tanto, wakizashi, naginata, bow, other
- **breathingStyle** (Enumeration) - water, flame, thunder, stone, wind, mist, flower, insect, beast, sound, serpent, love, sun
- **rarity** (Enumeration) - common, uncommon, rare, epic, legendary
- **specifications** (Long Text) - Technical details

### Media
- **image** (Media, Single) - Main product image
- **gallery** (Media, Multiple) - Additional images

### Metadata
- **slug** (UID, based on name)
- **featured** (Boolean) - For homepage featured products
- **inStock** (Boolean) - Availability
- **stockCount** (Number, Integer) - Quantity available

### SEO (Optional)
- **seoTitle** (Text)
- **seoDescription** (Text)
- **seoKeywords** (Text)

## Sample Products to Add:

### 1. Tanjiro's Nichirin Blade
- **Name**: "Water Breathing Nichirin Katana"
- **Description**: "A legendary blade forged from sun-absorbing ore, perfect for Water Breathing techniques. The blade changes color to reflect the wielder's breathing style."
- **Price**: 50000
- **Category**: swords
- **WeaponType**: katana
- **BreathingStyle**: water
- **Rarity**: legendary

### 2. Demon Slayer Uniform
- **Name**: "Official Demon Slayer Corps Uniform"
- **Description**: "Standard issue uniform for Demon Slayer Corps members. Provides protection and mobility for demon hunting missions."
- **Price**: 15000
- **Category**: armor
- **Rarity**: common

### 3. Wisteria Charm
- **Name**: "Wisteria Protection Charm"
- **Description**: "A protective charm infused with wisteria essence to repel demons."
- **Price**: 5000
- **Category**: accessories
- **Rarity**: uncommon