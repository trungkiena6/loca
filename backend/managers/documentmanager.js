'use strict';

import moment from 'moment';
import occupantModel from '../models/occupant';
import documentModel from '../models/document';

////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
function update(req, res) {
    const realm = req.realm;
    const occupant = documentModel.schema.filter(req.body);

    if (!occupant.documents) {
        occupant.documents = [];
    }

    occupantModel.findOne(realm, occupant._id, (errors, dbOccupant) => {
        if (errors) {
            res.json({
                errors: errors
            });
            return;
        }

        dbOccupant.documents = [];

        occupant.documents.forEach((document) => {
            const momentExpirationDate = moment(document.expirationDate, 'DD/MM/YYYY').endOf('day');
            if (document.name && document.name.trim() !== '' && momentExpirationDate.isValid()) {
                document.expirationDate = momentExpirationDate.toDate();
                dbOccupant.documents.push(document);
            }
        });

        occupantModel.update(realm, dbOccupant, (errors) => {
            if (errors) {
                res.json({
                    errors: errors
                });
                return;
            }
            res.json(dbOccupant);
        });
    });
}

export default {
    update
};
