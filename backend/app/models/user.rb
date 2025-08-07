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

  # Metodi pubblici
  def confirmed?
    confirmed_at.present?
  end

  def confirm!
    update(confirmed_at: Time.current, confirmation_token: nil)
  end

  # Checks if the user can make an AI API call based on monthly limits.
  def can_use_ai_api?
    reset_ai_api_usage_if_needed
    ai_api_calls_used_this_month < monthly_ai_api_call_limit
  end

  # Increments the count of AI API calls used by the user this month.
  def increment_ai_api_usage!
    reset_ai_api_usage_if_needed
    increment!(:ai_api_calls_used_this_month)
  end

  private

  def generate_confirmation_token
    self.confirmation_token = SecureRandom.urlsafe_base64(32)
  end

  # Resets the AI API usage count if the current month has changed or if never reset before.
  def reset_ai_api_usage_if_needed
    return unless ai_api_calls_reset_at.nil? || ai_api_calls_reset_at < Time.current.beginning_of_month

    update!(
      ai_api_calls_used_this_month: 0,
      ai_api_calls_reset_at: Time.current.beginning_of_month
    )
  end
end
