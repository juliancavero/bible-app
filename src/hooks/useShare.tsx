import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share, ShareResult } from "@capacitor/share";
import { useEffect, useState } from "react";
const useShare = () => {
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    const checkCanShare = async () => {
      const result = await Share.canShare();
      setSupported(result.value);
    };

    checkCanShare();
  }, []);

  const shareImage = async (
    imageUrl: string,
    fileName: string = "image",
    text: string
  ) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const base64 = await blobToBase64(blob);
      return await shareBase64(base64, fileName + ".jpg", text);
    } catch (error) {
      console.error("Error compartiendo la imagen:", error);
    }
  };

  const shareImageWithText = async (
    url: string,
    imageText: string,
    text: string,
    fileName: string = "image"
  ) => {
    const imageBlob = await fetch(url).then((res) => res.blob());
    const imageWithText = await addTextToImageBlob(imageBlob, imageText);
    const base64 = await blobToBase64(imageWithText);

    return shareBase64(base64, fileName + ".jpg", text);
  };

  const shareLink = async (url: string, title: string, text: string) => {
    return Share.share({
      title: title,
      text: text,
      url: url,
    });
  };

  return {
    shareImage,
    shareImageWithText,
    shareLink,
    supported,
  };
};

export default useShare;

const addTextToImageBlob = async (
  imageBlob: Blob,
  text: string
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No se pudo obtener el contexto del canvas."));
        return;
      }

      // Establecer el tamaño del canvas
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Configuración del estilo del texto
      const fontSize = 30;
      const padding = 10;
      const lineHeight = fontSize * 1.2;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "white";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";

      // Dividir el texto en líneas si es muy largo
      const maxWidth = img.width - padding * 2; // Ancho máximo para el texto
      const lines: string[] = [];
      let line = "";
      const words = text.split(" ");

      for (const word of words) {
        const testLine = line + word + " ";
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
          lines.push(line);
          line = word + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line); // Añadir la última línea

      // Dibujar un fondo negro detrás del texto
      const textHeight = lineHeight * lines.length + padding * 2;
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; // Fondo negro con opacidad
      ctx.fillRect(0, img.height - textHeight, img.width, textHeight);

      // Dibujar el texto línea por línea
      ctx.fillStyle = "white";
      lines.forEach((line, index) => {
        ctx.fillText(
          line,
          img.width - padding,
          img.height - padding - (lines.length - 1 - index) * lineHeight
        );
      });

      // Convertir el canvas a Blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("No se pudo crear el Blob del canvas."));
        }
      }, "image/jpeg");
    };

    img.onerror = () => reject(new Error("No se pudo cargar la imagen."));
  });
};

// Función auxiliar para convertir Blob a Base64
const blobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Asegurarse de que reader.result es un string
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]); // Obtén solo el contenido Base64
      } else {
        reject(new Error("El resultado no es una cadena"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const shareBase64 = async (
  base64: string,
  fileName: string,
  text: string = "Compartir"
): Promise<ShareResult> => {
  return await Filesystem.writeFile({
    path: fileName,
    data: base64,
    directory: Directory.Cache,
  })
    .then(() => {
      return Filesystem.getUri({
        directory: Directory.Cache,
        path: fileName,
      });
    })
    .then((uriResult) => {
      return Share.share({
        text: text,
        url: uriResult.uri,
        //files: [uriResult.uri],
      });
    });
};
