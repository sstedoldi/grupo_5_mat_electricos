/*Loading products tables*/

LOAD DATA LOCAL INFILE 'C:/Users/cynti/OneDrive/Escritorio/Ruben/SPRINTS/grupo_5_mat_electricos/products_tables/categories_table.csv' 
INTO TABLE  categories
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE 'C:/Users/cynti/OneDrive/Escritorio/Ruben/SPRINTS/grupo_5_mat_electricos/products_tables/subcategories_table.csv' 
INTO TABLE  subcategories
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE 'C:/Users/cynti/OneDrive/Escritorio/Ruben/SPRINTS/grupo_5_mat_electricos/products_tables/brands_table.csv' 
INTO TABLE  brands
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE 'C:/Users/cynti/OneDrive/Escritorio/Ruben/SPRINTS/grupo_5_mat_electricos/products_tables/products_table.csv' 
INTO TABLE  products
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
