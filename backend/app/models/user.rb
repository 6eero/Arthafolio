# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  # Validazioni
  validates :email,
            presence: true,
            uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password,
            length: { minimum: 8 },
            format: {
              with: /\A(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+\z/,
              message: 'deve contenere almeno una lettera maiuscola, un numero e un carattere speciale'
            },
            if: -> { new_record? || !password.nil? }

  validates :username,
            presence: true,
            uniqueness: { case_sensitive: false },
            length: { maximum: 30 },
            format: {
              with: /\A[a-zA-Z0-9_]+\z/,
              message: 'può contenere solo lettere, numeri e underscore'
            }

  # Relazioni
  has_many :holdings, dependent: :destroy
  has_many :portfolio_snapshots, dependent: :destroy

  # Callback
  before_create :generate_confirmation_token

  # Metodi conferma email
  def confirmed?
    confirmed_at.present?
  end

  def confirm!
    update(confirmed_at: Time.current, confirmation_token: nil)
  end

  private

  def generate_confirmation_token
    self.confirmation_token = SecureRandom.urlsafe_base64(32)
  end
end
