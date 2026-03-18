-- 1. Tabla para Autenticación
CREATE TABLE AdminAccount (
    ID_Admin SERIAL PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    userPassword VARCHAR(255) NOT NULL
);

-- 2. Tabla para Ubicaciones de Hoteles
CREATE TABLE HotelsLocation (
    ID_Locacion SERIAL PRIMARY KEY,
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    nombre_h VARCHAR(150) NOT NULL,
    direccion_h TEXT,
    telefono_h VARCHAR(20),
    src_imagen VARCHAR(255),
    fk_areaaca INT -- Asumo que es una referencia a áreas de Acapulco
);

-- 3. Tabla Principal de Artículos (Sectur)
CREATE TABLE Sectur_Articulos (
    ID_Articulo SERIAL PRIMARY KEY,
    Titulo_Articulo VARCHAR(200) NOT NULL,
    Imagen_Articulo VARCHAR(255)
);

-- 4. Tabla de Información Detallada de Artículos
CREATE TABLE Informacion_Articulos (
    Id_InformacionArt SERIAL PRIMARY KEY,
    FK_Articulo INT UNIQUE REFERENCES Sectur_Articulos(ID_Articulo) ON DELETE CASCADE,
    Titulo_Articulo VARCHAR(200),
    Subtitulo_Articulo VARCHAR(200),
    Puntos_Articulo TEXT, -- Usado para listas o detalles
    Informacion_Articulo TEXT
);

-- 5. Tabla para Galería de Imágenes de los Artículos
CREATE TABLE Imagenes_Articulos (
    ID_Imagen SERIAL PRIMARY KEY,
    FK_InformacionArt INT REFERENCES Informacion_Articulos(FK_Articulo) ON DELETE CASCADE,
    Imagen_Articulo VARCHAR(255)
);