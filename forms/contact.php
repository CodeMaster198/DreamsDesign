<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données du formulaire
    $type_client = $_POST['type_client'] ?? '';
    $nom_prenom = $_POST['nom_prenom'] ?? '';
    $raison_social = $_POST['raison_social'] ?? '';
    $email = $_POST['email'] ?? '';
    $telephone = $_POST['telephone'] ?? '';
    $adresse = $_POST['adresse'] ?? '';
    $pays = $_POST['pays'] ?? '';
    $ville = $_POST['ville'] ?? '';
    $type_projet = $_POST['type_projet'] ?? '';
    $largeur = $_POST['largeur'] ?? '';
    $hauteur = $_POST['hauteur'] ?? '';
    $commentaire = $_POST['text_grand'] ?? '';
    $quantite = $_POST['quantite'] ?? '';

    $fileContent = ''; // Initialisation

    // Créez une nouvelle instance de PHPMailer
    $mail = new PHPMailer(true);
    try {
        // Configuration du serveur SMTP DreamsCards
        $mail->isSMTP();
        $mail->Host = 'mail.dreamscards.tn'; // Serveur SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'rochdi@dreamscards.tn'; // Email DreamsCards
        $mail->Password = 'Masinissa123'; // Mot de passe du compte
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Utilisation de SSL/TLS
        $mail->Port = 465; // Port SMTP sécurisé

        // Expéditeur et destinataire
        $mail->setFrom('rochdi@dreamscards.tn', 'DreamsCards');
        $mail->addAddress('rochdi@dreamscards.tn', 'Rochdi');

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = "Nouveau message depuis le formulaire de contact";
        $mail->Body = "
        <h2>Nouveau message reçu :</h2>
        <p><strong>Type de client :</strong> $type_client</p>
        <p><strong>Nom et Prénom :</strong> $nom_prenom</p>
        <p><strong>Raison Sociale :</strong> $raison_social</p>
        <p><strong>Email :</strong> $email</p>
        <p><strong>Téléphone :</strong> $telephone</p>
        <p><strong>Adresse :</strong> $adresse</p>
        <p><strong>Pays :</strong> $pays</p>
        <p><strong>Ville :</strong> $ville</p>
        <p><strong>Type de Projet :</strong> $type_projet</p>
        <p><strong>Quantite:</strong> $quantite</p>
        <p><strong>Dimensions :</strong> $largeur cm x $hauteur cm</p>
        <p><strong>Commentaire :</strong> $commentaire</p>
        ";

        // Gestion des fichiers attachés
        if (!empty($_FILES['fichiers']) && isset($_FILES['fichiers']['name']) && is_array($_FILES['fichiers']['name'])) {
            foreach ($_FILES['fichiers']['tmp_name'] as $key => $tmp_name) {
                if (is_uploaded_file($tmp_name)) {
                    $fileName = $_FILES['fichiers']['name'][$key];
                    $fileTmp = $_FILES['fichiers']['tmp_name'][$key];

                    // Ajout de l'attachement
                    $mail->addAttachment($fileTmp, $fileName);

                    // Si c'est une image, ajout inline
                    $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                    if (in_array($extension, ['jpg', 'jpeg', 'png'])) {
                        $cid = 'image' . $key . '@' . md5($fileName);
                        $mail->addEmbeddedImage($fileTmp, $cid, $fileName);
                        $fileContent .= "<p><img src='cid:$cid' alt='$fileName' style='width:300px;'></p>";
                    }

                    $fileContent .= "<p><strong>Fichier attaché :</strong> $fileName</p>";
                } else {
                    echo "Erreur lors du téléchargement du fichier : $fileName<br>";
                }
            }
        } else {
            echo "Aucun fichier téléchargé.<br>";
        }

        if ($fileContent) {
            $mail->Body .= "<h3>Fichiers :</h3>" . $fileContent;
        }

        // Envoyer l'email
        $mail->send();
        
        // Rediriger après l'envoi
        header('Location: ../devis.html?showAlert=1');
        exit;
        
    } catch (Exception $e) {
        echo "Erreur lors de l'envoi : {$mail->ErrorInfo}";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
