from ..extensions import db

class FareRule(db.Model):
    __tablename__ = 'fare_rules'

    id = db.Column(db.Integer, primary_key=True)
    from_zone_id = db.Column(db.Integer, db.ForeignKey('zones.id'), nullable=False)
    to_zone_id = db.Column(db.Integer, db.ForeignKey('zones.id'), nullable=False)
    fare = db.Column(db.Integer, nullable=False)

    __table_args__ = (db.UniqueConstraint('from_zone_id', 'to_zone_id', name='_from_to_zone_uc'),)

    from_zone = db.relationship('Zone', foreign_keys=[from_zone_id])
    to_zone = db.relationship('Zone', foreign_keys=[to_zone_id])

class Zone(db.Model):
    __tablename__ = 'zones'

    id = db.Column(db.Integer, primary_key=True)
    zone_description = db.Column(db.Text, nullable=True)

class Cap(db.Model):
    __tablename__ = 'cap'

    id = db.Column(db.Integer, primary_key=True)    
    max_cap = db.Column(db.Integer)

